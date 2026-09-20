#!/usr/bin/env bash
set -euo pipefail

IMAGE="${1:?image wajib diisi}"
DIGEST="${2:?digest wajib diisi}"
SERVICE=portfolio

export XDG_RUNTIME_DIR="/run/user/$(id -u)"
export DBUS_SESSION_BUS_ADDRESS="unix:path=${XDG_RUNTIME_DIR}/bus"

diagnostics() {
  systemctl --user status "$SERVICE" --no-pager --lines 30 || true
  podman logs --tail 50 "$SERVICE" || true
}

PREVIOUS_ID="$(podman image inspect "${IMAGE}:latest" --format '{{.Id}}' 2>/dev/null || true)"

echo "==> Pull ${IMAGE}@${DIGEST}"
podman pull "${IMAGE}@${DIGEST}"
podman tag "${IMAGE}@${DIGEST}" "${IMAGE}:latest"

echo "==> Restart ${SERVICE} (menunggu container sehat)"
if systemctl --user restart "$SERVICE"; then
  echo "==> Deploy berhasil"
  podman image prune -f
  exit 0
fi

echo "!! Container baru tidak sehat"
diagnostics

if [ -z "$PREVIOUS_ID" ]; then
  echo "!! Tidak ada image sebelumnya di lokal, rollback tidak bisa dilakukan"
  exit 1
fi

echo "==> Rollback ke image ${PREVIOUS_ID:0:12}"
podman tag "$PREVIOUS_ID" "${IMAGE}:latest"

if systemctl --user restart "$SERVICE"; then
  echo "==> Rollback berhasil, versi sebelumnya kembali jalan"
else
  echo "!! Rollback juga gagal, service kemungkinan down"
  diagnostics
fi

exit 1

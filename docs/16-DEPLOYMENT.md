# Deployment

Docelowo usługi są konteneryzowane przez Docker, a pipeline wykorzystuje GitHub Actions. Środowiska: lokalne, testowe/staging i produkcyjne.

## Elementy

- aplikacje webowe Next.js;
- API NestJS;
- PostgreSQL;
- Redis;
- storage MinIO lub Cloudflare R2;
- Stripe po zatwierdzeniu modelu komercyjnego;
- Expo dla klienta mobilnego;
- Electron lub Tauri dla klienta desktopowego.

## Reguły

Migracje bazy są kontrolowane, wdrożenia mają health check i plan rollbacku, a sekrety nie trafiają do repo ani obrazu. Backup i test odtworzenia są warunkiem produkcji.

Hosting, regiony, monitoring, domeny, MinIO vs R2 oraz Electron vs Tauri są do decyzji w ADR. Obecny `docker-compose.yml` nie uruchamia usług celowo.

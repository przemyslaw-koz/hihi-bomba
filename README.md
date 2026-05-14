# Hihi Bomba 💣

This is a fun little web project created together with my kids — just for laughs and learning.
It features a bouncing cartoon character and laugh audio.

The project is also used as a base for experimenting with:
- **Cloudflare Tunnels** (secure public access),
- **Umami Analytics** (privacy-friendly tracking),
- **Ansible Automation** (infra-as-code),
- and general **DevOps best practices**.

Deployed using [Vercel](https://vercel.com), with automatic builds on every push.

## Health and readiness

Static JSON probes for load balancers, uptime checks, and orchestrators:

| Endpoint | Role | Typical use |
|----------|------|-------------|
| `GET /health` | **Liveness** — the deployment is up and serving traffic. | Restart if unhealthy (here always `200` when the edge can return the file). |
| `GET /ready` | **Readiness** — the app considers itself ready to receive requests. | Remove from rotation if not ready (static bundle is always ready when deployed). |

Example:

```bash
curl -sS https://<your-deployment>/health
curl -sS https://<your-deployment>/ready
```

Responses are JSON (`Content-Type: application/json` for the `.json` targets). On Vercel, [`vercel.json`](vercel.json) rewrites `/health` → `/health.json` and `/ready` → `/ready.json`. On any other static host, call `/health.json` and `/ready.json` directly if clean-path rewrites are not configured.

Made by **Julek 💣** and **Janek 🏠** with my small help.

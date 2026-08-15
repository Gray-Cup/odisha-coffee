import type { Route } from "./+types/geo";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const country = request.headers.get("cf-ipcountry") || null;
    return Response.json({ country });
  } catch {
    return Response.json({ country: null });
  }
}

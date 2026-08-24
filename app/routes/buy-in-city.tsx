import { redirect } from "react-router";
import type { Route } from "./+types/buy-in-city";

export function loader({ params }: Route.LoaderArgs) {
  return redirect(`/buy-green-coffee/${params.city}`, 301);
}

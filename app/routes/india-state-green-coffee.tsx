import { redirect } from "react-router";
import type { Route } from "./+types/india-state-green-coffee";

export function loader({ params }: Route.LoaderArgs) {
  return redirect(`/buy-green-coffee/${params.state}`, 301);
}

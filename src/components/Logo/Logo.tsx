import { NavigationLink } from "src/components/Link";

export default function Logo(): JSX.Element {
  return (
    <NavigationLink to="/" variant="h4" color="secondary" underline="none">
      FarmedBy
    </NavigationLink>
  );
}

import { Lenis } from "@/libs/react-lenis";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Lenis root>{children}</Lenis>;
}

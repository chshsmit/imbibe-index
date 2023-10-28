export interface VectorProps {
  height?: number;
  width?: number;
}

export type VectorComponent = (props: VectorProps) => JSX.Element;

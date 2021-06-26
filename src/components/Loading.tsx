type LoadingProps = {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps) {
  if (loading) {
    return <div>Carregando</div>;
  }

  return  <></>; 

}
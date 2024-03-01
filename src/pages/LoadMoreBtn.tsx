import { useActions } from "../hooks/actions";

export const LoadMoreBtn = () => {
  const { setOffset } = useActions();

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={() => setOffset()}>Загрузить ещё</button>
    </div>
  )
}

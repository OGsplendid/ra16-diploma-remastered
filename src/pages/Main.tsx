import { Catalog } from "./Catalog"
import { TopSales } from "./TopSales"

export const Main = () => {
  return (
    <>
      <TopSales />
      <Catalog withSearchField={false} />
    </>
  )
}

import { PropsWithChildren } from "react";
import banner from '../img/banner.jpg';

export const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid header-image" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

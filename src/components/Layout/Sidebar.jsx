import { menu } from "../../data";
import Menu from "../Menu";
import Avatar from "../../assets/img/avatar.jpeg";
import { loadState } from "../../helpers/local_storage";

export const Sidebar = () => {
  const user = loadState() && loadState().user;

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <div className="pt-3">
            {menu.map((data, id) => (
              <div key={id}>
                <Menu data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

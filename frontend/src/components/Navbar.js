import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducerAndActions/userReducer";
const Navbar = () => {
  const { token, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="main-nav">
      <h1 className="nav-logo">Food Ordering App</h1>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "linkActive" : undefined)}
          >
            Home
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink
                to="/allfooditems"
                className={({ isActive }) =>
                  isActive ? "linkActive" : undefined
                }
              >
                FoodItems
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "linkActive" : undefined
                }
              >
                Orders
              </NavLink>
            </li>
            {userData && userData.role == "Admin" && (
              <>
                <li>
                  <NavLink
                    to="/admin-orders"
                    className={({ isActive }) =>
                      isActive ? "linkActive" : undefined
                    }
                  >
                    AdminO
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-item"
                    className={({ isActive }) =>
                      isActive ? "linkActive" : undefined
                    }
                  >
                    Add
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "linkActive" : undefined
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "linkActive" : undefined
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;

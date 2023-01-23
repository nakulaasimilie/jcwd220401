import Pages404 from "../components/404";
import BarAdmin from "../components/BarAdmin";
import SuperPage from "./superPage";

export const AdminPage = () => {
  const tokenLocalStorageSuper = localStorage.getItem("tokenAdmin");
  const tokenLocalStorageBranch = localStorage.getItem("tokenBranch");

  return (
    <div>
      {tokenLocalStorageSuper ? (
        <SuperPage />
      ) : tokenLocalStorageBranch ? (
        <BarAdmin />
      ) : (
        <Pages404 />
      )}
    </div>
  );
};

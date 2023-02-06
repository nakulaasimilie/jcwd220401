import Pages404 from "../components/404";
import SuperPage from "./superPage";
import BranchPage from "./branchPage";
export const AdminPage = () => {
  const tokenLocalStorageSuper = localStorage.getItem("tokenAdmin");
  const tokenLocalStorageBranch = localStorage.getItem("tokenBranch");

  return (
    <div>
      {tokenLocalStorageSuper ? (
        <SuperPage />
      ) : tokenLocalStorageBranch ? (
        <BranchPage />
      ) : (
        <Pages404 />
      )}
    </div>
  );
};

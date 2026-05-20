import {useContext} from "react";
import {useNavigate} from "react-router";
import {NexusContext} from "../../NexusContextProvider";
import deconnexion from "../../img/deconnexion.png";

export default function ProfileBadge() {
    const {setContext, user} = useContext(NexusContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem("nexus-user");
        // Update context
        setContext({user: null});
        // Redirect to login
        navigate("/login", {replace: true});
    };

    if (!user) {
        return null;
    }

    const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();
    const roleDisplay = user.is_admin ? "Admin" : (user.user_type || "Utilisateur");

  return (
    <div className="flex flex-row gap-x-2 justify-between align-items-center items-center text-lgr">
      <div className="flex flex-col">
          <div className="font-semibold">{fullName}</div>
          <div className="text-sm text-[#6B7280]">{roleDisplay}</div>
          <div className="text-xs text-app-gray-dark">{user.email}</div>
      </div>
      <div>
        <img
          className="max-w-16 max-h-16 rounded-lg"
          src="../src/img/pp_hornet_tmp.png"
          alt="photo de profil"
        />
      </div>
        <button onClick={handleLogout} className="cursor-pointer bg-none border-none p-0">
        <img
          src={deconnexion}
          className="w-8 h-8"
          alt="bouton de déconnexion"
        />
        </button>
    </div>
  );
}

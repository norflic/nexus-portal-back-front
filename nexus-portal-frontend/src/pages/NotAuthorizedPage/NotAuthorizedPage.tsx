import {useNavigate} from "react-router";

export default function NotAuthorizedPage() {
    const nav = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Accès refusé</h1>
            <p className="mt-4">Vous n'avez pas les droits suffisants pour voir cette page.</p>
            <button className="mt-6 p-2 bg-app-blue text-white rounded" onClick={() => nav(-1)}>Retour</button>
        </div>
    );
}


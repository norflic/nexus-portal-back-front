type MissionSheetPageProps = {};

export default function MissionSheetPage({}: MissionSheetPageProps) {
    return (
        <div className="grid grid-cols-2 w-full h-full space-evenly gap-8">
            <div className="bg-red-200">Template de la fiche mission</div>
            <div className="bg-red-200">Remplir le formulaire sur Monstage</div>
        </div>
    );
}

import { useNavigate } from "react-router";
import BasicButton from "../../components/Buttons/BasicButton";
import Text3D from "../../components/Text3D/Text3D";
import Page from "../Page";

type NotFoundPageProps = {};

export default function NotFoundPage({}: NotFoundPageProps) {
    const navigate = useNavigate();

    const LAYER_COUNT = 10;
    return (
        <Page name={"Page Introuvable"}>
            <div className="flex w-auto h-full flex-col">
                <div className="flex w-1/4 h-1/4 m-auto">
                    <Text3D
                        text="404"
                        color="rgb(0, 0, 220)"
                        layerCount={LAYER_COUNT}
                    />
                </div>
                <div className="mb-auto flex flex-col">
                    <span
                        className="text-blue-500 mb-auto text-center"
                        style={{ fontSize: "3vw" }}
                    >
                        La page n'a pas pu être trouvée
                    </span>
                    <BasicButton
                        onClickFunction={() => navigate("/")}
                        className="m-auto"
                    >
                        Retour à l'accueil
                    </BasicButton>
                </div>
            </div>
        </Page>
    );
}

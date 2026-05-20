import StudentPresentation from "./StudentPresentation/StudentPresentation";
import StudentCompany from "./StudentCompany/StudentCompany";
import StudentSoutenance from "./StudentSoutenance/StudentSoutenance";
import Page from "../Page";

export default function StudentPage() {
    return (
        <Page name="Student Page">
            <div className="flex flex-col">
                <StudentPresentation/>
                <StudentCompany/>
                <StudentSoutenance/>
            </div>
        </Page>
    );
}

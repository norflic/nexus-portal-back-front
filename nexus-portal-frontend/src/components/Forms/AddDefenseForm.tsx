import {useMemo, useState} from "react";
import CustomBasicInput from "./FormsComponents/CustomBasicInput.tsx";
import type {AddDefenseFormValues} from "./AddDefenseFormValues.ts";
import type {CompanyType} from "../../models/Company.ts";
import type {User} from "../../models/User.ts";

interface AddDefenseFormProps {
    onSubmit: (formValues: AddDefenseFormValues) => void;
    companies: CompanyType[];
    users: User[];
    isSubmitting?: boolean;
}

export default function AddDefenseForm({
                                           onSubmit,
                                           companies,
                                           users,
                                           isSubmitting = false,
                                       }: AddDefenseFormProps) {
    const [room, setRoom] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [companyId, setCompanyId] = useState<number>(0);
    const [studentId, setStudentId] = useState<number>(0);
    const [companyMemberId, setCompanyMemberId] = useState<number>(0);
    const [candidTeacherId, setCandidTeacherId] = useState<number>(0);
    const [techTeacherId, setTechTeacherId] = useState<number>(0);

    const [touched, setTouched] = useState({
        room: false,
        date: false,
        companyId: false,
        studentId: false,
        companyMemberId: false,
        candidTeacherId: false,
        techTeacherId: false,
    });

    const students = useMemo(() => users.filter((user) => user.user_type === "student"), [users]);
    const companyMembers = useMemo(
        () => users.filter((user) => user.user_type === "company_member"),
        [users],
    );
    const teachers = useMemo(() => users.filter((user) => user.user_type === "teacher"), [users]);

    const getRoomError = () => (room.trim() === "" ? "La salle est requise" : undefined);

    const getDateError = () => {
        if (date.trim() === "") return "La date est requise";
        return Number.isNaN(new Date(date).getTime()) ? "La date est invalide" : undefined;
    };

    const getCompanyIdError = () =>
        companyId <= 0 ? "L'entreprise est requise" : undefined;

    const getStudentIdError = () =>
        studentId <= 0 ? "L'étudiant est requis" : undefined;

    const getCompanyMemberIdError = () =>
        companyMemberId <= 0 ? "Le tuteur entreprise est requis" : undefined;

    const getCandidTeacherIdError = () =>
        candidTeacherId <= 0 ? "Le professeur candide est requis" : undefined;

    const getTechTeacherIdError = () =>
        techTeacherId <= 0 ? "Le professeur technicien est requis" : undefined;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setTouched({
            room: true,
            date: true,
            companyId: true,
            studentId: true,
            companyMemberId: true,
            candidTeacherId: true,
            techTeacherId: true,
        });

        if (
            !getRoomError() &&
            !getDateError() &&
            !getCompanyIdError() &&
            !getStudentIdError() &&
            !getCompanyMemberIdError() &&
            !getCandidTeacherIdError() &&
            !getTechTeacherIdError()
        ) {
            onSubmit({
                room: room.trim(),
                date: new Date(date),
                company_id: companyId,
                student_id: studentId,
                company_member_id: companyMemberId,
                candid_teacher_id: candidTeacherId,
                tech_teacher_id: techTeacherId,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg">
            <CustomBasicInput
                id="room"
                name="room"
                description="Salle: "
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                onBlur={() => setTouched({...touched, room: true})}
                error={getRoomError()}
                touched={touched.room}
            />

            <CustomBasicInput
                id="date"
                name="date"
                description="Date: "
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={() => setTouched({...touched, date: true})}
                error={getDateError()}
                touched={touched.date}
            />

            <div className="flex gap-2">
                <label className="w-1/2" htmlFor="company_id">Entreprise: </label>
                <div className="w-1/2 flex flex-col gap-1">
                    <select
                        id="company_id"
                        name="company_id"
                        value={companyId}
                        onBlur={() => setTouched({...touched, companyId: true})}
                        onChange={(event) => setCompanyId(Number(event.target.value))}
                        className={`w-full border rounded-full px-2 py-1 ${
                            touched.companyId && getCompanyIdError() ? "outline-none border-red-500" : "border-[#CACACA]"
                        }`}
                    >
                        <option value={0}>Choisir une entreprise</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    {touched.companyId && getCompanyIdError() && (
                        <span className="text-red-500 text-sm">{getCompanyIdError()}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <label className="w-1/2" htmlFor="student_id">Etudiant: </label>
                <div className="w-1/2 flex flex-col gap-1">
                    <select
                        id="student_id"
                        name="student_id"
                        value={studentId}
                        onBlur={() => setTouched({...touched, studentId: true})}
                        onChange={(event) => setStudentId(Number(event.target.value))}
                        className={`w-full border rounded-full px-2 py-1 ${
                            touched.studentId && getStudentIdError() ? "outline-none border-red-500" : "border-[#CACACA]"
                        }`}
                    >
                        <option value={0}>Choisir un etudiant</option>
                        {students.map((user) => (
                            <option key={user.id} value={user.id}>
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                    {touched.studentId && getStudentIdError() && (
                        <span className="text-red-500 text-sm">{getStudentIdError()}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <label className="w-1/2" htmlFor="company_member_id">Tuteur entreprise: </label>
                <div className="w-1/2 flex flex-col gap-1">
                    <select
                        id="company_member_id"
                        name="company_member_id"
                        value={companyMemberId}
                        onBlur={() => setTouched({...touched, companyMemberId: true})}
                        onChange={(event) => setCompanyMemberId(Number(event.target.value))}
                        className={`w-full border rounded-full px-2 py-1 ${
                            touched.companyMemberId && getCompanyMemberIdError()
                                ? "outline-none border-red-500"
                                : "border-[#CACACA]"
                        }`}
                    >
                        <option value={0}>Choisir un tuteur entreprise</option>
                        {companyMembers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                    {touched.companyMemberId && getCompanyMemberIdError() && (
                        <span className="text-red-500 text-sm">{getCompanyMemberIdError()}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <label className="w-1/2" htmlFor="candid_teacher_id">Professeur candide: </label>
                <div className="w-1/2 flex flex-col gap-1">
                    <select
                        id="candid_teacher_id"
                        name="candid_teacher_id"
                        value={candidTeacherId}
                        onBlur={() => setTouched({...touched, candidTeacherId: true})}
                        onChange={(event) => setCandidTeacherId(Number(event.target.value))}
                        className={`w-full border rounded-full px-2 py-1 ${
                            touched.candidTeacherId && getCandidTeacherIdError()
                                ? "outline-none border-red-500"
                                : "border-[#CACACA]"
                        }`}
                    >
                        <option value={0}>Choisir un professeur candide</option>
                        {teachers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                    {touched.candidTeacherId && getCandidTeacherIdError() && (
                        <span className="text-red-500 text-sm">{getCandidTeacherIdError()}</span>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <label className="w-1/2" htmlFor="tech_teacher_id">Professeur technicien: </label>
                <div className="w-1/2 flex flex-col gap-1">
                    <select
                        id="tech_teacher_id"
                        name="tech_teacher_id"
                        value={techTeacherId}
                        onBlur={() => setTouched({...touched, techTeacherId: true})}
                        onChange={(event) => setTechTeacherId(Number(event.target.value))}
                        className={`w-full border rounded-full px-2 py-1 ${
                            touched.techTeacherId && getTechTeacherIdError()
                                ? "outline-none border-red-500"
                                : "border-[#CACACA]"
                        }`}
                    >
                        <option value={0}>Choisir un professeur technicien</option>
                        {teachers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {`${user.firstname} ${user.lastname}`}
                            </option>
                        ))}
                    </select>
                    {touched.techTeacherId && getTechTeacherIdError() && (
                        <span className="text-red-500 text-sm">{getTechTeacherIdError()}</span>
                    )}
                </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creation..." : "Enregistrer"}
            </button>
        </form>
    );
}


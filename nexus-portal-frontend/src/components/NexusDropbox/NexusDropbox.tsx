import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import grayUpload from "../../img/gray_upload.svg";

export default function NexusDropbox({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<Array<File> | null>>;
}) {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex flex-col border-5 border-gray-300 border-dashed rounded-xl items-center cursor-pointer select-none"
      {...getRootProps()}
    >
      <img src={grayUpload} className="w-20 h-20 mt-5" />
      <p className="text-lg font-semibold nexusGray">
        Nouvelle version du rapport
      </p>
      <div className="bg-gray-50 rounded-xl mt-3 py-3 px-6">
        <p className="text-lg nexusGray">Choisir un fichier</p>
      </div>
      <input {...getInputProps()} />
      <p className="my-3 nexusGray">PDF ou DOC max 10Mo</p>
    </div>
  );
}

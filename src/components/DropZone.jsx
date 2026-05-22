export function DropZone({ label, file, setFile }) {
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    }
  }

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-black transition"
    >
      <label className="block text-sm font-medium mb-2">{label}</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id={label}
      />

      {!file ? (
        <label htmlFor={label} className="block text-gray-400 text-sm">
          Drag & drop image here
          <br />
          <span className="underline">or click to upload</span>
        </label>
      ) : (
        <img
          src={URL.createObjectURL(file)}
          className="mt-2 h-40 mx-auto object-contain rounded-lg"
        />
      )}
    </div>
  );
}

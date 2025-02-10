export const ContactMeBtn = (text) => {
    return (
        <button className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700">
           {text.label}: {text.children}
        </button>
    );
};
import { ContactMeBtn } from "./ContactMeBtn"

export const Footer = () => {
    return (
        <footer className="flex justify-between items-center border-t py-6 mt-20 px-20">
            <p className="pr-10">Aozora Copyright 2024</p>
            <ContactMeBtn label="Button">
                Contact Me
            </ContactMeBtn>
        </footer>
    )
}
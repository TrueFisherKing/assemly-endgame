import { languages } from "./data";

export default function LanguageChips(props) {
    return languages.map((language, i) => {
        const { name, backgroundColor, color } = language;
        const style = {
            backgroundColor,
            color,
        };

        const isLanguageLost = i < props.wrongGuessCount;

        return (
            <span
                className={`chip ${isLanguageLost ? "lost" : ""}`}
                style={style}
                key={name}
                role="status" // Indicates a status message for screen readers
                aria-live="polite" // Announce changes politely to avoid interruptions
                aria-label={`${name} ${isLanguageLost ? `${name} is lost` : `${name} is available`}`} // Clear announcement for screen readers
                tabIndex="0" // Makes the span focusable for keyboard navigation
            >
                {name}
            </span>
        );
    });
}

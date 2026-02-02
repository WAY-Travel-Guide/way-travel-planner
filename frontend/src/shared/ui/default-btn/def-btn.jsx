import './def-btn.css';

// Универсальная кнопка с синим стилем.
const DefaultButton = function( {children, onClick, style ={}} ) {
    
    const { bgColor, textColor, backdropFilter, width, height, borderColor } = style;

    // Собираем объект стилей для CSS-переменных:
    const vars = {
        ...(bgColor         && { '--btn-color':             bgColor }),
        ...(width           && { '--btn-width':             width }),
        ...(height          && { '--btn-height':            height }),
        ...(textColor       && { '--btn-text-color':        textColor }),
        ...(backdropFilter  && { '--btn-backdrop-filter':   backdropFilter}),
        ...(borderColor     && { '--btn-border-color':      borderColor}),
    };
    
    return (
        <button
            className="button"
            onClick={onClick}
            style={vars}
        >
            {children}
        </button>
    );
}

export { DefaultButton };

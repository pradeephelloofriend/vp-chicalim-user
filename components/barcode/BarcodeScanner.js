import "../../dbr";
import React from 'react';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

class BarcodeScannerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.bDestroyed = false;
        this.pScanner = null;
        this.elRef = React.createRef();
    }
    async componentDidMount() {
        try {
            let scanner = await (this.pScanner = this.pScanner || BarcodeScanner.createInstance());
            if (this.bDestroyed) {
                scanner.destroy();
                return;
            }
            this.elRef.current.appendChild(scanner.getUIElement());
            await scanner.open();
        } catch (ex) {
            console.error(ex);
        }
    }
    async componentDidMount() {
        try {
            //Omitted code...
            this.elRef.current.appendChild(scanner.getUIElement());
            scanner.onFrameRead = results => {
                for (let result of results) {
                    const format = result.barcodeFormat ? result.barcodeFormatString : result.barcodeFormatString_2;
                    this.props.appendMessage({ format, text: result.barcodeText, type: "result" });
                    if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
                        this.props.appendMessage({ msg: result.exception.message, type: "error" });
                    }
                }
            };
            await scanner.open();
        } catch (ex) {
            this.props.appendMessage({ msg: ex.message, type: "error" });
            console.error(ex);
        }
      }
    shouldComponentUpdate() {
        // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
        return false;
    }
    render() {
        return (
            <div  ref={this.elRef}>
            </div>
        );
    }
}

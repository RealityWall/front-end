import React from 'react';

export default React.createClass({

    getInitialState() {
        return {
            file: null,
            fileUrl: null
        };
    },

    _handleFile(e) {
        let self = this;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (upload) {
            self.setState({
                file: file,
                fileUrl: upload.target.result
            });
        };
        reader.readAsDataURL(file);
    },

    getValue() {
        return this.state.file;
    },

    reset() {
        this.setState({
            file: null,
            fileUrl: null
        });
        this.refs.picture.value = null;
    },

    render() {
        return (
            <div>
                <input type="file" ref="picture" accept="image/*" placeholder="La photo du mur à mettre en ligne" required
                       onChange={this._handleFile}/>

                {
                    this.state.fileUrl ?
                        <img src={this.state.fileUrl} alt="aperçu du mur" height="300"/>
                        : null
                }
            </div>
        );
    }

});

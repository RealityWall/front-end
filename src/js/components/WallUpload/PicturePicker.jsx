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
            <div style={{textAlign: 'center'}}>

                <button className="btn btn-transparent" style={{position: 'relative', marginBottom: '8px'}}>
                    <i className="fa fa-camera" style={{marginRight: '8px'}}></i>
                    Choisir une photo
                    <input type="file"
                           style={{position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}}
                           ref="picture"
                           accept="image/*"
                           placeholder="La photo du mur à mettre en ligne"
                           required
                           onChange={this._handleFile}/>
                </button>

                {
                    this.state.fileUrl ?
                        <img src={this.state.fileUrl} alt="aperçu du mur"/>
                        : null
                }
            </div>
        );
    }

});

import Spinner from '../../assets/images/spinner.gif';

const IsLoading = () => {
    return ( 
        <div className="container">
            <div className="spinner-wrapper">
                <img className="loadingSpinner" src={Spinner}></img>
            </div>
        </div>
     );
}
 
export default IsLoading;
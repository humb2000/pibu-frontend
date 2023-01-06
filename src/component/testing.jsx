import React, {useEffect} from "react";

function Testing() {

    useEffect(() => {
        console.log('este es el useEfecct');
    }, []);

    return <div>este componente es para test</div>;
}

export default Testing;
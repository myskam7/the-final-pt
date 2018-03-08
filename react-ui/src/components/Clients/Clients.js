import React from 'react';  
import './Clients.css';
import ClientModal from '../ClientModal';
import ClientDiv from '../ClientDiv';
import $ from 'jquery';


var clients = [];
//this component will need to store data from the api into its state and then call the state and loop through
//the array and dynamically create client divs with client information. --figure out how to automatically 
//make new pages upon reaching the max limit of viewable clients on the page. 

class Clients extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients,
            added_client: false
        }
        this.callApi = this.callApi.bind(this);
        this.addClient = this.addClient.bind(this);
        this.fade = this.fade.bind(this);
    }

    componentDidMount() {
        //make the api call inside here and set the state within the api call promise
        this.callApi()
            .then(clients => this.setState({ clients }))
            .catch(err => console.log(err));
            //once this is all done, the state will contain all the clients as an array. now you can use the map
            //method and dynamically add the client divs unto the page

        console.log('component did mount Clients.js state: ', this.state.clients);


    }
    // shouldComponentUpdate(nextState) {
    //     if(nextState !== this.state){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    // addedClient() {
    //     //making another api call after the modal is submitted, this will update this page to show the newly
    //     //added divs in realtime. 
    //     this.callApi()
    //     .then(clients => this.setState({ clients }))
    //     .catch(err => console.log(err));
        
    //     console.log('addedClient state: ', this.state.clients);

    // }

    //make the api call to the server to get clients
    //be sure to add query to get request, and then access the params in the server side
    callApi = async () => {
        //going to need to get the current id and pass it into storage to be retrieved here
        // const query = sessionStorage.getItem();
        const id = sessionStorage.getItem('myToken');
        //probably had to parse the token string because in the router.js, urlencoded is set to true, so
        //the parameters are expected to be in an object instead and you need to parse a string to json
        const response = await fetch('/api/clients/' + JSON.parse(id), { method: 'GET' } );
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        console.log("async callApi from Clients.js: ", body);

        clients = body;

        return clients;
    }
    fade() {

        $(".client-added-div").fadeOut().empty();
    }
    addClient() {
        this.setState({ added_client: !this.state.added_client });
        console.log("added client state from clients.js: ", this.state.added_client);

        this.callApi()
            .then(clients => {
                var client_added_div = $("<div>").addClass("client-added-div");
                client_added_div.text("Client added!");
                
                $(document.body).append(client_added_div);
                //call the setTimeout function and then pass in user defined function here
                setTimeout(this.fade, 3000);

                this.setState({ clients })
            })
            //add the logic to display the div on success
            .catch(err => console.log(err));

    }


    render(){ 
        console.log('state from Clients.js render: ', this.state.clients);
    return (
        <div>
            <div>
                <div className="h1">Clients</div>
                <ClientModal addClient={this.addClient} />
                {/* <ClientModal onClick={this.addedClient}/> */}
            </div>
            <div>
                {/* need to add magnifying glass, add in eventhandler that will query the data
                base and default to display all clients and render them below. When a user starts
                entering in letters, change the client grid field to filter out anything that doesn't
                have that letter*/}
                <input type="text" placeholder="  Search" className="clientSearch" />
            </div>
            <div className="cRow">
            {/* need to add drop down */}
                <div className="c1" >Name</div> <div className="c2" >Date Added</div> <div className="c3" >Actions</div>
            </div>
            <div className="clientList" id="clientDiv">
                {/* add pagination that will limit the amount of divs displayed and pass over to the next page */}
                {this.state.clients.map(client => (<ClientDiv clientData={client} fullname={client.fullname} date={client.formatted_date} key={client._id}/>))}
            </div>
            {/* potentially feature:
                display modal showing client details upon clicking the client's name  */}
        </div>
    );
 }
}


export default Clients;
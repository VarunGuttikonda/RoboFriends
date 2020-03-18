const robots = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz'
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv'
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net'
    },
    {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org'
    },
    {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca'
    },
    {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info'
    },
    {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz'
    },
    {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me'
    },
    {
        id: 9,
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io'
    },
    {
        id: 10,
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz'
    }
];

//Root DOM Node
class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            robots:[],
            searchfield:""
        }
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users/")
        .then(response=> {return response.json();})
        .then(users =>{
            this.setState({robots:users})
        })
    }

    onSearchChange = (event) =>{
        console.log(event.target.value);
        this.setState({searchfield: event.target.value})
    }

    render(){
        const filtered = this.state.robots.filter(robot => { return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());})
        return(
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList list={robots} />
                </Scroll>
            </div>
        );
    }
}

//Card Component
class Card extends React.Component{
    constructor(props){
        super(props);
        const {id,name,email}=props;
        {this.id=id;
        this.name=name;
        this.email=email;}
    }

    render(){
        return(
            <div className='bg-light-green dib br2 pa3 ma2 grow bw2 shadow-5 tc'>
                <img src={`https://robohash.org/${this.id}?50x50`} alt=""/>
                <div>
                    <h2>{this.name}</h2>
                    <p>{this.email}</p>
                </div>
            </div>
        );
    }
}

//CardList Component
class CardList extends React.Component{
    constructor(props){
        super(props)
        this.list=props.list;
    this.cards=this.list.map((robot,index)=> <Card key={index} id={robot.id} name={robot.name} email={robot.name} />)
    }
    render(){
        return(
            <div>
                {this.cards}
            </div>
        );
    }
}

//SearchBox Component
const SearchBox = (props) =>{
    return(
        <div className="pa2">
            <input
                type="search"
                placeholder="Search Robots"
                className="pa3 ba b--green bg-lightest-blue"
                onChange={props.searchChange}
            />
        </div>
    );
}

//Scroll
const Scroll = (props)=>{
    return(
        <div style={{overflowY:'scroll',border:'1px solid black',height:'700px'}}>
            {props.children}
        </div>
    );
}
//Rendering to the DOM
const root = document.querySelector('#root');

ReactDOM.render(<App />,root);
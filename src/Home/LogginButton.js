function LoggingButton(props){
    if(props.isLogging){
        return(
        <Button 
                                    className="My-Login-Button" 
                                    variant="dark"
                                    hidden={this.state.isLogging}
                                    onClick={this.auth.bind(this)}>{this.state.isLogging ? 'Logowanie' : 'Zaloguj'}
                                </Button>);
    }
    else{
        return( <Loader type="Oval" color="#00BFFF" height={80} width={80} />);
    }
}

export default LoggingButton;
import React, { Component } from "react";
import { Header } from '../container';
import { TweetForm } from '../component/tweetForm';
import { TweetList } from '../component/tweetList';
import moment from 'moment';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            tweetText: "",
            tweets: [],
            userData: []
        }

        this.onChangeTweetForm = this.onChangeTweetForm.bind(this);
        this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
    }

    componentWillMount() {
        fetch("userData.json")
            .then((response) => response.json())
            .then((data) => this.setState({ userData: data }))
            .catch((error) => console.error(error))

        fetch('tweetData.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ tweets: data }))
        .catch(err => console.log(err));
    }

onChangeTweetForm(event) {
    this.setState({ tweetText: event.target.value });
}

handleTweetSubmit() {
    const { tweets, userData } = this.state;
    const newTweet = this.state.tweetText;
    const loginUser = JSON.parse(localStorage.getItem("user"))

    const loginUserData = userData.filter((user) => loginUser.username === user.username)[0];

    const tweetList = [...tweets];
    tweetList.unshift({
        id: "000000-00000-0000-0000-0000000000",
        name: loginUserData.name,
        username: loginUserData.username,
        tweetContent: newTweet,
        likeCount: 15,
        retweetCount: 35,
        replyCount: 5,
        dateTime: moment(new Date().toLocaleString()).format("YYYY-MMM-D H:mm:ss")
    })

    this.setState({
        tweets: tweetList
    })

}

render() {
    const { tweetText, tweets } = this.state;

    return (
        <div className="latestTweets">
            <Header title="Home" />
            <TweetForm
                tweetText={tweetText}
                onChangeTweetForm={this.onChangeTweetForm}
                handleTweetSubmit={this.handleTweetSubmit} />
            <div className="latestTweets__divisor" />
            {
                tweets.length > 0 ? (
                    <TweetList tweets={tweets} />
                ) : (
                    <span>Loading...</span>
                )
            }
        </div>
    );
}
}

export default Home;
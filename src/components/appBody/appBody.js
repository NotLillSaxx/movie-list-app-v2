import React from "react";
import "./appBody.css";
import axios from "axios";
import { ItemsList, Header, Loader } from "components";
import { CustomedUseEffect } from "utils";

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: [],
      pageNumber: 1,
      searchKey: "",
      stopRequesting: false,
      loading: true,
    };
  }

  componentDidMount() {
    // to fetch the first page of the data as soon as the applicaton starts
    this.requestListData();

    // to fetch data when scrolling
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // to remove the listener
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchKey, items, filteredItems } = this.state;

    // to filter data baeed on the given search value
    if (prevState.searchKey != searchKey) {
      // to set the filtered array back to the original state when user delete his search value
      if (searchKey == "") {
        this.setState({
          filteredItems: items,
        });
      } else {
        const list = items.filter((item) =>
          item.name.toLowerCase().includes(searchKey.trim().toLowerCase())
        );

        this.setState({
          filteredItems: list,
        });
      }
    }
  }

  // to update the state `searchKey`
  handleChangeSearchKey = (textValue) => {
    this.setState({
      searchKey: textValue,
    });
  };

  /*
    to request cards data
  */
  requestListData = () => {
    // the state to indict to not do more unnecessary requests in case we requesteed all the data or some network error happened
    if (this.state.stopRequesting) {
      return;
    }

    // when start requesting application status set to loading
    this.setState({
      loading: true,
    });

    axios
      .get(
        `https://test.create.diagnal.com/data/page${this.state.pageNumber}.json`
      )
      .then((res) => {
        // handle success
        const listData = res.data.page?.["content-items"]?.content;

        // to filter data if there was search key value
        const list = [...this.state.items, ...listData].filter((item) =>
          item.name.toLowerCase().includes(this.state.searchKey.toLowerCase())
        );

        // to add the values to the array
        this.setState({
          items: [...this.state.items, ...listData],
          filteredItems: list,
          pageNumber: this.state.pageNumber + 1,
          loading: false,
        });

        // stop requesting after getting the full items
        if (res.data.page?.["total-content-items"] == this.state.items.length) {
          this.setState({
            stopRequesting: true,
          });
        }
      })
      .catch((error) => {
        // handle error
        // when error 403 is back that's  mean there is no more items to be finished
        this.setState({
          stopRequesting: true,
          loading: false,
        });
      });
  };

  // to request data whenever user started scrolling
  handleScroll = () => {
    const currentScrol =
      window.innerHeight + document.documentElement.scrollTop;

    if (
      currentScrol == document.documentElement.offsetHeight ||
      currentScrol >= document.documentElement.offsetHeight - 20
    ) {
      this.requestListData();
    }
  };

  render() {
    const { items, loading, stopRequesting } = this.state;
    return (
      <div className="app-body">
        {items.length == 0 && loading ? (
          <Loader />
        ) : (
          <div>
            <Header setSearchKey={this.handleChangeSearchKey} />
            <ItemsList
              searchKey={this.state.searchKey}
              items={this.state.filteredItems}
            />

            {!stopRequesting && loading && (
              <div className="scroll-loader">
                <Loader />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AppBody;

export const state = () => ({
  products: [
    // {
    //   id: 1,
    //   title: 'Product 1',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 50,
    //   ratings: 3,
    //   reviews: 5,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // }
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: ''
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  },
  books: []
})

export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books;
  }
}

export const actions = {
  async getBooks({ commit }) {
    let books = [];
    const booksSnapshot = await this.$fireStore.collection('products').get()
    booksSnapshot.forEach(bookSnapshot => {
      const book = bookSnapshot.data()
      books.push(book)
    });
    console.log(books);
    commit("SET_BOOKS", books)
  },

  async logout({ commit }) {
    const { data } = await this.$axios.get("/api/logout")
    if (data.ok) commit("SET_USER", null)
  },

  async handleToken({ commit }, token) {
    const res = await this.$axios.post("/api/stripe", token)
    commit("SET_USER", res.data)
  }
}

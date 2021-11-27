export default function ({ store, redirect }) {
    if (!store.state.auth.loggedIn || !store.state.auth.user.admin) {
        return redirect('/login');
    }
}
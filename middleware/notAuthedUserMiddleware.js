export default function ({ store, redirect, app, localePath }) {
  if (!app.$cookies.get('task_user_token')) {
    return redirect(localePath('/auth/login'));
  };
}

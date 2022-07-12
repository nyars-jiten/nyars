export function avatarUrl(relative: string) {
	console.log(relative);

	return new URL(relative, `${import.meta.env.VITE_BASE_URL}/upload/avatars/`);
}

export function avatarUrl(relative: string) {
	return new URL(relative, `${import.meta.env.VITE_BASE_URL}/upload/avatars/`);
}

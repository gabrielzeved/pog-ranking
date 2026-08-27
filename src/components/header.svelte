<script>
	import { page } from '$app/stores';
</script>

<header class="relative z-20 h-20 w-full border-b-2 border-gold-4 px-4">
	<div class="mx-auto flex h-full max-w-7xl items-center justify-between">
		<a href="/" aria-label="POG Ranking — início">
			<img
				class="h-28 translate-y-3 md:h-40 md:translate-y-5"
				alt="POG Ranking"
				src="/ranking-no-bg.png"
			/>
		</a>
		<nav
			aria-label="Navegação principal"
			class="flex items-center gap-1 text-xs font-bold uppercase tracking-[.12em] md:gap-3"
		>
			<a class:active={$page.url.pathname === '/'} href="/">Destaques</a>
			<a class:active={$page.url.pathname.startsWith('/tabela')} href="/tabela">Tabela</a>
		</nav>
	</div>
</header>

<style>
	nav a {
		padding: 10px 9px;
		border-bottom: 1px solid transparent;
		color: rgb(240 230 210 / 55%);
		transition:
			color 0.18s ease,
			border-color 0.18s ease;
	}
	nav a:hover,
	nav a.active {
		border-color: #c89b3c;
		color: #f0e6d2;
	}
</style>

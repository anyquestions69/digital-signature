<template>
	<div class="main__pdf">
		<div :style="{ width: '1028px', height: '700px' }">
			<VPdfViewer src="/src/assets/pdf/3.pdf" base="http://localhost:5173" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { VPdfViewer } from '@vue-pdf-viewer/viewer'
</script>

<style lang="scss">
.main__pdf {
	margin: 100px 0;
	@include Flex;
	pointer-events: none;

	.pdf__content {
		width: 400px;
		height: 500px;
		pointer-events: auto;
	}
}
</style>

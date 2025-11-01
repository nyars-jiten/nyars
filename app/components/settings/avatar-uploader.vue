<script setup lang="ts">
const { user } = storeToRefs(useUserStore())
const { changeAvatar: uploadUserAvatar, deleteAvatar: removeUserAvatar } = useSettings()
const { getUserAvatarUrl } = useUserProfile()

const isUploading = ref(false)
const showCropModal = ref(false)
const selectedFile = ref<File | null>(null)
const cropData = ref({
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  scale: 1,
})

const fileInput = ref<HTMLInputElement>()
const cropCanvas = ref<HTMLCanvasElement>()

// Avatar URL
const avatarUrl = computed(() => {
  if (user.value?.avatar) {
    return getUserAvatarUrl(user.value.avatar).href
  }
  return '/default-avatar.png'
})

// Handle file selection
function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    if (!file.type.startsWith('image/')) {
      console.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      console.error('File size must not exceed 5MB')
      return
    }

    selectedFile.value = file
    showCropModal.value = true
  }
}

// Handle crop
function handleCrop() {
  if (!selectedFile.value || !cropCanvas.value)
    return

  const canvas = cropCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  const img = new Image()
  img.onload = () => {
    // Set canvas size
    canvas.width = 200
    canvas.height = 200

    // Calculate crop area
    const { x, y, width, height, scale } = cropData.value
    const scaledWidth = width * scale
    const scaledHeight = height * scale

    // Draw cropped image
    ctx.drawImage(
      img,
      x,
      y,
      scaledWidth,
      scaledHeight,
      0,
      0,
      200,
      200,
    )

    // Convert to blob and upload
    canvas.toBlob(async (blob) => {
      if (blob) {
        await uploadAvatar(blob)
      }
    }, 'image/jpeg', 0.9)
  }

  img.src = URL.createObjectURL(selectedFile.value)
}

// Upload avatar
async function uploadAvatar(blob: Blob) {
  try {
    isUploading.value = true

    const formData = new FormData()
    formData.append('avatar', blob, 'avatar.jpg')

    await uploadUserAvatar(formData)

    showCropModal.value = false
    selectedFile.value = null

    // Refresh user data
    await refreshCookie('user')
  }
  catch (error) {
    console.error('Failed to upload avatar:', error)
  }
  finally {
    isUploading.value = false
  }
}

// Remove avatar
async function removeAvatar() {
  try {
    isUploading.value = true

    await removeUserAvatar()

    // Refresh user data
    await refreshCookie('user')
  }
  catch (error) {
    console.error('Failed to remove avatar:', error)
  }
  finally {
    isUploading.value = false
  }
}

// Handle mouse events for crop area
function _handleMouseDown(_event: MouseEvent) {
  // TODO: Implement crop area dragging
}

function _handleMouseMove(_event: MouseEvent) {
  // TODO: Implement crop area resizing
}

function _handleMouseUp(_event: MouseEvent) {
  // TODO: Implement crop area finalizing
}
</script>

<template>
  <UiBlock>
    <template #default>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">
            Аватарка
          </h2>
        </div>

        <div class="flex items-start gap-6">
          <!-- Current Avatar -->
          <div class="flex flex-col items-center gap-4">
            <div class="relative group">
              <img
                :src="avatarUrl"
                :alt="user?.username"
                class="w-24 h-24 rounded-full object-cover border-2 border-neutral-700"
              >
              <div v-if="isUploading" class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              </div>
            </div>

            <div class="flex gap-2">
              <UiButton
                color="edit"
                :disabled="isUploading"
                @click="fileInput?.click()"
              >
                <Icon name="ic:baseline-upload" />
                Загрузить
              </UiButton>

              <UiButton
                v-if="user?.avatar"
                color="delete"
                :disabled="isUploading"
                @click="removeAvatar"
              >
                <Icon name="ic:baseline-delete" />
                Удалить
              </UiButton>
            </div>
          </div>

          <!-- Upload Info -->
          <div class="flex-1 space-y-2">
            <h3 class="text-lg font-medium">
              Загрузка аватарки
            </h3>
            <p class="text-sm text-neutral-400">
              Рекомендуемый размер: 200x200 пикселей. Максимальный размер файла: 5MB.
              Поддерживаемые форматы: JPG, PNG, GIF.
            </p>

            <div class="text-xs text-neutral-500">
              После загрузки вы сможете обрезать изображение до нужного размера.
            </div>
          </div>
        </div>

        <!-- Hidden file input -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        >
      </div>

      <!-- Crop Modal -->
      <div
        v-if="showCropModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click="showCropModal = false"
      >
        <div
          class="bg-neutral-800 rounded-lg p-6 max-w-2xl w-full mx-4"
          @click.stop
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">
              Обрезка изображения
            </h3>
            <button
              class="text-neutral-400 hover:text-white"
              @click="showCropModal = false"
            >
              <Icon name="ic:baseline-close" size="1.5rem" />
            </button>
          </div>

          <div class="space-y-4">
            <!-- Crop Area -->
            <div class="relative border-2 border-dashed border-neutral-600 rounded-lg p-4">
              <div class="text-center text-neutral-400 mb-4">
                Перетащите и масштабируйте область обрезки
              </div>

              <!-- TODO: Implement actual crop interface -->
              <div class="w-full h-64 bg-neutral-700 rounded flex items-center justify-center">
                <div class="text-neutral-500">
                  Crop Interface (TODO)
                </div>
              </div>
            </div>

            <!-- Crop Controls -->
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-neutral-400 mb-1">
                  Масштаб: {{ cropData.scale.toFixed(1) }}x
                </label>
                <input
                  v-model="cropData.scale"
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  class="w-full"
                >
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 justify-end">
              <UiButton
                color="cancel"
                @click="showCropModal = false"
              >
                Отмена
              </UiButton>
              <UiButton
                color="save"
                :disabled="isUploading"
                @click="handleCrop"
              >
                <Icon name="ic:baseline-crop" />
                Обрезать и загрузить
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UiBlock>
</template>

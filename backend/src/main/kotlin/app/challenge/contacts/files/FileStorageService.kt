package app.challenge.contacts.files

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.server.ResponseStatusException
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.UUID

@Service
class FileStorageService(
    @Value("\${file.upload-dir}") private val uploadDir: String
) {

    private val log = LoggerFactory.getLogger(javaClass)

    init {
        val path = Paths.get(uploadDir)
        if (!Files.exists(path)) {
            Files.createDirectories(path)
            log.info("Created upload directory at: {}", path.toAbsolutePath())
        }
    }

    fun store(file: MultipartFile): String {
        if (file.isEmpty) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty file")
        }

        val originalName = file.originalFilename ?: "file"
        val ext = StringUtils.getFilenameExtension(originalName) ?: "png"

        val filename = UUID.randomUUID().toString() + "." + ext.lowercase()
        val targetPath = Paths.get(uploadDir).resolve(filename).normalize()

        Files.copy(file.inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING)
        return "/$filename"
    }

    fun delete(storedPath: String) {
        val cleanName = storedPath.trimStart('/')
        val targetPath = Paths.get(uploadDir).resolve(cleanName).normalize()

        if (Files.exists(targetPath)) {
            Files.delete(targetPath)
            log.info("Deleted file at {}", targetPath.toAbsolutePath())
        } else {
            log.info("Tried to delete non-existing file: {}", targetPath.toAbsolutePath())
        }
    }
}

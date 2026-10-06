import cv2
import os
import sys

def extract_frames(video_path, output_dir):
    if not os.path.exists(video_path):
        print(f"Erro: Arquivo {video_path} nao encontrado.")
        return

    os.makedirs(output_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Erro: Nao foi possivel abrir o video {video_path}.")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps if fps > 0 else 0

    print("=== METADADOS DO VIDEO ===")
    print(f"Resolucao: {width}x{height}")
    print(f"FPS: {fps:.2f}")
    print(f"Total de quadros: {total_frames}")
    print(f"Duracao: {duration:.2f}s")
    print(f"Destino dos quadros PNG: {output_dir}")
    print("Iniciando extracao quadro a quadro em PNG...")

    frame_idx = 0
    saved_count = 0

    # Parametro de compressao PNG sem perdas (compressao 3 para equilibrio entre velocidade e tamanho)
    png_params = [cv2.IMWRITE_PNG_COMPRESSION, 3]

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_idx += 1
        filename = f"frame_{frame_idx:04d}.png"
        filepath = os.path.join(output_dir, filename)

        cv2.imwrite(filepath, frame, png_params)
        saved_count += 1

        if frame_idx % 25 == 0 or frame_idx == total_frames:
            print(f"Progresso: {frame_idx}/{total_frames} quadros salvos ({(frame_idx/total_frames)*100:.1f}%)")

    cap.release()
    print(f"Concluido com sucesso! {saved_count} quadros PNG salvos em {output_dir}.")

if __name__ == "__main__":
    video = sys.argv[1] if len(sys.argv) > 1 else "tridon.mp4"
    dest = sys.argv[2] if len(sys.argv) > 2 else "public/frames"
    extract_frames(video, dest)

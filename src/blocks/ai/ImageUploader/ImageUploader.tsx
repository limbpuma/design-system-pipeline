import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * ImageUploader Block
 *
 * Professional drag-and-drop image upload component for AI analysis workflows.
 * Features animated states, progress tracking, and polished visual feedback.
 *
 * @accessibility
 * - Keyboard accessible drop zone
 * - ARIA labels for all actions
 * - Focus management
 * - Screen reader announcements
 */

const uploaderVariants = cva(
  'relative rounded-2xl border-2 border-dashed transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'border-slate-300 dark:border-slate-600',
          'bg-slate-50/50 dark:bg-slate-800/50',
          'hover:border-slate-400 dark:hover:border-slate-500',
          'hover:bg-slate-100/50 dark:hover:bg-slate-700/50',
        ],
        elevated: [
          'border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-900',
          'shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50',
          'hover:shadow-xl',
        ],
      },
      size: {
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface ImageUploaderProps extends VariantProps<typeof uploaderVariants> {
  /** Currently uploaded images */
  images: UploadedImage[];
  /** Handler for file selection */
  onFilesSelected: (files: File[]) => void;
  /** Handler for image removal */
  onRemove: (id: string) => void;
  /** Maximum number of images */
  maxImages?: number;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Accepted file types */
  acceptedTypes?: string[];
  /** Custom placeholder content */
  placeholder?: React.ReactNode;
  /** Show instructions */
  showInstructions?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Additional class name */
  className?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Animated upload icon
const UploadIcon: React.FC<{ isActive?: boolean }> = ({ isActive }) => (
  <div className={cn(
    'relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
    isActive
      ? 'bg-blue-500 text-white scale-110'
      : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-400 dark:text-slate-500'
  )}>
    <svg
      className={cn('w-8 h-8 transition-transform duration-300', isActive && 'animate-bounce')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
    {isActive && (
      <span className="absolute -inset-1 rounded-2xl bg-blue-500/20 animate-ping" />
    )}
  </div>
);

// Progress ring component
const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 48 }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/30"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-white transition-all duration-300"
      />
    </svg>
  );
};

export function ImageUploader({
  images,
  onFilesSelected,
  onRemove,
  maxImages = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  placeholder,
  showInstructions = true,
  disabled = false,
  error,
  variant,
  size,
  className,
}: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const canAddMore = images.length < maxImages;
  const completedCount = images.filter((img) => img.status === 'complete').length;

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`);
        continue;
      }
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max ${formatFileSize(maxFileSize)})`);
        continue;
      }
      if (images.length + valid.length >= maxImages) {
        errors.push(`Maximum ${maxImages} images allowed`);
        break;
      }
      valid.push(file);
    }

    return { valid, errors };
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || disabled) return;

    const { valid, errors } = validateFiles(Array.from(files));

    if (errors.length > 0) {
      setLocalError(errors.join('; '));
      setTimeout(() => setLocalError(null), 5000);
    } else {
      setLocalError(null);
    }

    if (valid.length > 0) {
      onFilesSelected(valid);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    if (!disabled && canAddMore) {
      inputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && canAddMore) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const hasError = error || localError;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop zone */}
      <div
        className={cn(
          uploaderVariants({ variant, size }),
          'cursor-pointer focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          isDragOver && [
            'border-blue-500 dark:border-blue-400',
            'bg-blue-50 dark:bg-blue-900/20',
            'scale-[1.02]',
          ],
          hasError && [
            'border-red-400 dark:border-red-500',
            'bg-red-50/50 dark:bg-red-900/10',
          ],
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Upload images"
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {placeholder || (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <UploadIcon isActive={isDragOver} />
            </div>

            <p className={cn(
              'text-lg font-semibold transition-colors duration-200',
              isDragOver
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-200'
            )}>
              {isDragOver ? 'Drop your images here' : 'Drop images here or click to browse'}
            </p>

            {showInstructions && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {acceptedTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      {type.split('/')[1].toUpperCase()}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Max {formatFileSize(maxFileSize)} per file · Up to {maxImages} images
                </p>
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {completedCount} uploaded
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {maxImages - images.length} remaining
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <div
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-xl',
            'bg-red-50 dark:bg-red-900/20',
            'border border-red-200 dark:border-red-800/30',
            'animate-in slide-in-from-top-2 duration-300'
          )}
          role="alert"
        >
          <svg
            className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400">{error || localError}</p>
        </div>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className={cn(
                'relative aspect-square rounded-xl overflow-hidden',
                'bg-slate-100 dark:bg-slate-800',
                'ring-1 ring-slate-200 dark:ring-slate-700',
                'group transition-all duration-200',
                'hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500',
                'hover:shadow-lg hover:scale-[1.02]',
                'animate-in fade-in zoom-in-95 duration-300'
              )}
            >
              <img
                src={image.preview}
                alt="Uploaded file preview"
                className="w-full h-full object-cover"
              />

              {/* Progress overlay */}
              {image.status === 'uploading' && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <ProgressRing progress={image.progress} />
                  <span className="text-white text-sm font-medium">{image.progress}%</span>
                </div>
              )}

              {/* Error overlay */}
              {image.status === 'error' && (
                <div className="absolute inset-0 bg-red-500/90 backdrop-blur-sm flex flex-col items-center justify-center p-3">
                  <svg className="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-white text-xs text-center font-medium">{image.error || 'Upload failed'}</p>
                </div>
              )}

              {/* Success indicator */}
              {image.status === 'complete' && (
                <div className={cn(
                  'absolute top-2 right-2 w-7 h-7 rounded-full',
                  'bg-emerald-500 shadow-lg shadow-emerald-500/50',
                  'flex items-center justify-center',
                  'animate-in zoom-in duration-300'
                )}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(image.id);
                }}
                className={cn(
                  'absolute top-2 left-2 w-7 h-7 rounded-full',
                  'bg-slate-900/70 backdrop-blur-sm text-white',
                  'opacity-0 group-hover:opacity-100',
                  'hover:bg-red-500 hover:scale-110',
                  'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white',
                  'transition-all duration-200',
                  'flex items-center justify-center'
                )}
                aria-label="Remove image"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* File info on hover */}
              <div className={cn(
                'absolute inset-x-0 bottom-0',
                'bg-gradient-to-t from-slate-900/80 to-transparent',
                'px-3 py-2 pt-6',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-200'
              )}>
                <p className="text-white text-xs font-medium truncate">
                  {image.file.name}
                </p>
                <p className="text-white/70 text-[10px]">
                  {formatFileSize(image.file.size)}
                </p>
              </div>
            </div>
          ))}

          {/* Add more button */}
          {canAddMore && images.length > 0 && (
            <button
              onClick={handleClick}
              className={cn(
                'aspect-square rounded-xl',
                'border-2 border-dashed border-slate-300 dark:border-slate-600',
                'bg-slate-50/50 dark:bg-slate-800/50',
                'hover:border-blue-400 dark:hover:border-blue-500',
                'hover:bg-blue-50/50 dark:hover:bg-blue-900/20',
                'flex flex-col items-center justify-center gap-2',
                'transition-all duration-200',
                'group'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl',
                'bg-slate-200 dark:bg-slate-700',
                'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50',
                'flex items-center justify-center',
                'transition-colors duration-200'
              )}>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-blue-500 transition-colors">
                Add more
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

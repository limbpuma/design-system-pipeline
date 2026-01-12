import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * ImageUploader Block
 *
 * A professional drag-and-drop image upload component with elegant visual feedback.
 * Features animated states, progress tracking, and modern design patterns.
 *
 * @accessibility
 * - Keyboard accessible drop zone (Enter/Space)
 * - ARIA labels for all interactive elements
 * - Focus management and visible states
 * - Screen reader announcements for status changes
 */

const uploaderVariants = cva(
  'relative rounded-2xl transition-all duration-300 overflow-hidden',
  {
    variants: {
      variant: {
        default: [
          'border-2 border-dashed',
          'border-slate-300 dark:border-slate-600',
          'bg-slate-50/50 dark:bg-slate-800/50',
          'hover:border-slate-400 dark:hover:border-slate-500',
          'hover:bg-slate-100/50 dark:hover:bg-slate-700/50',
        ],
        elevated: [
          'border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-900',
          'shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50',
          'hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600',
        ],
        minimal: [
          'border border-dashed border-slate-200 dark:border-slate-700',
          'bg-transparent',
          'hover:bg-slate-50 dark:hover:bg-slate-800/50',
        ],
      },
      size: {
        sm: 'p-4',
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
  /** File selection handler */
  onFilesSelected: (files: File[]) => void;
  /** Image removal handler */
  onRemove: (id: string) => void;
  /** Maximum images allowed */
  maxImages?: number;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Accepted file types */
  acceptedTypes?: string[];
  /** Custom placeholder */
  placeholder?: React.ReactNode;
  /** Show file type instructions */
  showInstructions?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Additional class */
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
const UploadIcon: React.FC<{ isActive?: boolean; className?: string }> = ({ isActive, className }) => (
  <div className={cn(
    'relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
    isActive
      ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white scale-110 shadow-xl shadow-blue-500/30'
      : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-500 dark:text-slate-400',
    className
  )}>
    <svg
      className={cn('w-7 h-7 transition-transform duration-300', isActive && 'animate-bounce')}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
    {isActive && (
      <span className="absolute inset-0 rounded-2xl bg-blue-400/30 animate-ping" aria-hidden="true" />
    )}
  </div>
);

// Circular progress ring
const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 44 }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
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
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {progress}%
      </span>
    </div>
  );
};

// Image preview card
const ImagePreview: React.FC<{
  image: UploadedImage;
  onRemove: () => void;
}> = ({ image, onRemove }) => (
  <div className={cn(
    'relative group aspect-square rounded-xl overflow-hidden',
    'bg-slate-100 dark:bg-slate-800',
    'ring-1 ring-slate-200 dark:ring-slate-700',
    'transition-all duration-200',
    'hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500',
    'hover:shadow-lg hover:scale-[1.02]',
    'animate-in fade-in zoom-in-95 duration-300'
  )}>
    <img
      src={image.preview}
      alt={`Preview of ${image.file.name}`}
      className="w-full h-full object-cover"
    />

    {/* Upload progress overlay */}
    {image.status === 'uploading' && (
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
        <ProgressRing progress={image.progress} />
        <span className="text-white text-xs font-medium">Uploading...</span>
      </div>
    )}

    {/* Error overlay */}
    {image.status === 'error' && (
      <div className="absolute inset-0 bg-red-500/90 backdrop-blur-sm flex flex-col items-center justify-center p-3">
        <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-white text-xs text-center font-medium">{image.error || 'Upload failed'}</p>
      </div>
    )}

    {/* Success checkmark */}
    {image.status === 'complete' && (
      <div className={cn(
        'absolute top-2 right-2 w-7 h-7 rounded-full',
        'bg-emerald-500 shadow-lg shadow-emerald-500/50',
        'flex items-center justify-center',
        'animate-in zoom-in duration-300'
      )}>
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}

    {/* Remove button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className={cn(
        'absolute top-2 left-2 w-8 h-8 rounded-full',
        'bg-slate-900/60 backdrop-blur-sm text-white',
        'opacity-0 group-hover:opacity-100',
        'hover:bg-red-500 hover:scale-110',
        'focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
        'transition-all duration-200',
        'flex items-center justify-center'
      )}
      aria-label={`Remove ${image.file.name}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* File info on hover */}
    <div className={cn(
      'absolute inset-x-0 bottom-0',
      'bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent',
      'px-3 py-3 pt-8',
      'opacity-0 group-hover:opacity-100',
      'transition-opacity duration-200'
    )}>
      <p className="text-white text-sm font-medium truncate">{image.file.name}</p>
      <p className="text-white/70 text-xs">{formatFileSize(image.file.size)}</p>
    </div>
  </div>
);

export function ImageUploader({
  images,
  onFilesSelected,
  onRemove,
  maxImages = 10,
  maxFileSize = 10 * 1024 * 1024,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
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
  const uploadingCount = images.filter((img) => img.status === 'uploading').length;

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Unsupported format`);
        continue;
      }
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: Exceeds ${formatFileSize(maxFileSize)} limit`);
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
      setLocalError(errors.join('. '));
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
    if (!disabled && canAddMore) {
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
            'bg-blue-50/80 dark:bg-blue-900/30',
            'scale-[1.01]',
            'shadow-xl shadow-blue-500/20',
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
        aria-label={`Upload images. ${images.length} of ${maxImages} images uploaded.`}
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
          aria-hidden="true"
        />

        {placeholder || (
          <div className="text-center">
            <div className="flex justify-center mb-5">
              <UploadIcon isActive={isDragOver} />
            </div>

            <p className={cn(
              'text-lg font-semibold transition-colors duration-200 mb-2',
              isDragOver
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-200'
            )}>
              {isDragOver ? 'Drop your images here' : 'Drag & drop images here'}
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              or <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">browse files</span>
            </p>

            {showInstructions && (
              <div className="space-y-3">
                {/* File types */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {acceptedTypes.map((type) => (
                    <span
                      key={type}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-medium',
                        'bg-slate-100 dark:bg-slate-800',
                        'text-slate-600 dark:text-slate-400',
                        'border border-slate-200 dark:border-slate-700'
                      )}
                    >
                      {type.split('/')[1].toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Limits */}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Max {formatFileSize(maxFileSize)} per file · Up to {maxImages} images
                </p>

                {/* Progress indicator */}
                {images.length > 0 && (
                  <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">{completedCount} uploaded</span>
                    </div>
                    {uploadingCount > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
                        <span className="text-slate-600 dark:text-slate-400">{uploadingCount} uploading</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">{maxImages - images.length} slots left</span>
                    </div>
                  </div>
                )}
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
            'border border-red-200 dark:border-red-800/50',
            'animate-in slide-in-from-top-2 duration-300'
          )}
          role="alert"
        >
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400">{error || localError}</p>
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((image) => (
            <ImagePreview
              key={image.id}
              image={image}
              onRemove={() => onRemove(image.id)}
            />
          ))}

          {/* Add more button */}
          {canAddMore && (
            <button
              onClick={handleClick}
              disabled={disabled}
              className={cn(
                'aspect-square rounded-xl',
                'border-2 border-dashed border-slate-200 dark:border-slate-700',
                'bg-slate-50/50 dark:bg-slate-800/50',
                'hover:border-blue-400 dark:hover:border-blue-500',
                'hover:bg-blue-50/50 dark:hover:bg-blue-900/20',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                'flex flex-col items-center justify-center gap-2',
                'transition-all duration-200',
                'group',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label="Add more images"
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
                  viewBox="0 0 24 24"
                  fill="none"
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

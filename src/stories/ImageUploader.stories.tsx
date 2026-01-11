import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ImageUploader, type UploadedImage, type ImageUploaderProps } from '../blocks/ai/ImageUploader';

const meta: Meta<typeof ImageUploader> = {
  title: 'AI Blocks/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ImageUploaderDemo = (args: Partial<ImageUploaderProps>) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleFilesSelected = (files: File[]) => {
    const newImages: UploadedImage[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const,
    }));
    setImages((prev) => [...prev, ...newImages]);

    // Simulate upload progress
    newImages.forEach((img) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? {
                  ...i,
                  progress,
                  status: progress < 100 ? 'uploading' : 'complete',
                }
              : i
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <ImageUploader
      {...args}
      images={images}
      onFilesSelected={handleFilesSelected}
      onRemove={handleRemove}
    />
  );
};

export const Default: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    maxImages: 5,
    maxFileSize: 10 * 1024 * 1024,
  },
};

export const Elevated: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    variant: 'elevated',
    maxImages: 3,
  },
};

export const SingleFile: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    maxImages: 1,
  },
};

export const Disabled: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    error: 'File size exceeds 10MB limit',
  },
};

export const SmallSize: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    size: 'sm',
    maxImages: 3,
  },
};

export const LargeSize: Story = {
  render: (args) => <ImageUploaderDemo {...args} />,
  args: {
    size: 'lg',
    maxImages: 10,
  },
};
